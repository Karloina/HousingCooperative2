package com.example.userservice.service.impl;

import java.util.*;
import java.util.stream.Collectors;

import com.example.userservice.dto.AppUserDto;
import com.example.userservice.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.ws.rs.core.Response;

@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements AppUserService {
    private static final String REALM_NAME = "springboot";
    private final Keycloak keycloakClient;

    public void addAppUser(AppUserDto appUserDto) {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setFirstName(appUserDto.getFirstName());
        userRepresentation.setLastName(appUserDto.getLastName());
        userRepresentation.setEmail(appUserDto.getEmail());
        userRepresentation.setEnabled(true);
        userRepresentation.setUsername(appUserDto.getLogin());

        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType("password");
        credentialRepresentation.setValue(appUserDto.getPassword());
        userRepresentation.setCredentials(Collections.singletonList(credentialRepresentation));

        userRepresentation.setAttributes(new HashMap<String, List<String>>() {{
            put("telephone", Collections.singletonList(appUserDto.getTelephone()));
            put("pesel", Collections.singletonList(appUserDto.getPesel()));
            if(appUserDto.getApartmentId() != null) {
                put("apartment_id", Collections.singletonList(appUserDto.getApartmentId().toString()));
            }
        }});
        Response kcResponse = keycloakClient.realm(REALM_NAME).users().create(userRepresentation);

        if (kcResponse.getStatus() < 200 || kcResponse.getStatus() >= 300) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Keycloak response error");
        }

        String[] locationUri = ((String) (kcResponse.getHeaders().get("Location").get(0))).split("/");
        String userId = locationUri[locationUri.length-1];

        keycloakClient.realm(REALM_NAME).users().get(userId).roles().realmLevel().add(Collections.singletonList(getRoleByName(appUserDto.getRole())));
        keycloakClient.realm(REALM_NAME).users().get(userId).sendVerifyEmail();
    }

    private RoleRepresentation getRoleByName(String name) {
        return keycloakClient.realm(REALM_NAME).roles().get(name).toRepresentation();
    }

    public void editAppUser(AppUserDto appUserDto) {
        UserRepresentation userRepresentation = keycloakClient.realm(REALM_NAME).users().get(appUserDto.getId()).toRepresentation();

        userRepresentation.setId(appUserDto.getId());
        userRepresentation.setFirstName(appUserDto.getFirstName());
        userRepresentation.setLastName(appUserDto.getLastName());
        userRepresentation.setEmail(appUserDto.getEmail());
        userRepresentation.setEnabled(appUserDto.isEnabled());
        userRepresentation.setRealmRoles(Collections.singletonList(appUserDto.getRole()));

        if (!appUserDto.getPassword().isEmpty()) {
            CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
            credentialRepresentation.setTemporary(false);
            credentialRepresentation.setType("password");
            credentialRepresentation.setValue(appUserDto.getPassword());
            userRepresentation.setCredentials(Collections.singletonList(credentialRepresentation));
        }

        Map<String, List<String>> attrs = new HashMap<>();
        if (userRepresentation.getAttributes() != null) {
            attrs = userRepresentation.getAttributes();
        }
        attrs.put("telephone", Collections.singletonList(appUserDto.getTelephone()));
        attrs.put("pesel", Collections.singletonList(appUserDto.getPesel()));
        if(appUserDto.getApartmentId() != null) {
            attrs.put("apartment_id", Collections.singletonList(appUserDto.getApartmentId().toString()));
        }

        userRepresentation.setAttributes(attrs);
        keycloakClient.realm(REALM_NAME).users().get(appUserDto.getId()).update(userRepresentation);

        List<RoleRepresentation> roleRepresentations = keycloakClient.realm(REALM_NAME).users().get(appUserDto.getId()).roles().realmLevel().listAll();

        List<RoleRepresentation> rolesToBeRemoved = roleRepresentations.stream().filter(rr -> !rr.getName().equals("offline_access")
                && !rr.getName().equals("uma_authorization")).collect(Collectors.toList());
        keycloakClient.realm(REALM_NAME).users().get(appUserDto.getId()).roles().realmLevel().remove(rolesToBeRemoved);

        keycloakClient.realm(REALM_NAME).users().get(appUserDto.getId()).roles().realmLevel().add(Collections.singletonList(getRoleByName(appUserDto.getRole())));
    }

    
    public List<AppUserDto> listAppUser() {
        return keycloakClient.realm(REALM_NAME).users().list().stream().map(ur -> {
            AppUserDto appUserDto = new AppUserDto();
            appUserDto.setEmail(ur.getEmail());
            appUserDto.setEnabled(ur.isEnabled());
            appUserDto.setFirstName(ur.getFirstName());
            appUserDto.setLogin(ur.getUsername());
            appUserDto.setRole(getUserRole(ur.getId()));
            appUserDto.setId(ur.getId());
            appUserDto.setLastName(ur.getLastName());
            List<String> apartment = ur.getAttributes().getOrDefault("apartment_id", new ArrayList<>());
            if (apartment != null && !apartment.isEmpty()) {
                String apartmentIdText = apartment.get(0);
                if (!apartmentIdText.isEmpty()) {
                    appUserDto.setApartmentId(Long.parseLong(apartment.get(0)));
                }
            }
            appUserDto.setTelephone(String.join(", ", ur.getAttributes() == null ? new ArrayList<>() : ur.getAttributes().getOrDefault("telephone", Collections.singletonList(""))));
            appUserDto.setPesel(String.join(", ", ur.getAttributes() == null ? new ArrayList<>() : ur.getAttributes().getOrDefault("pesel", Collections.singletonList(""))));
            return appUserDto;
        }).collect(Collectors.toList());
    }

    private String getUserRole(String userId) {
        return keycloakClient.realm(REALM_NAME).users().get(userId).roles().realmLevel().listAll().stream()
                .filter(r -> Arrays.asList("manager", "administrator", "user").contains(r.getName())).findFirst()
                .orElse(new RoleRepresentation()).getName();
    }


    public void removeAppUser(String id) {
        Response delete = keycloakClient.realm(REALM_NAME).users().delete(id);
        if (delete.getStatus() < 200 || delete.getStatus() >= 300) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Keycloak response error");
        }
    }
}
