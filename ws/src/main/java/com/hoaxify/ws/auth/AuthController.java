package com.hoaxify.ws.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.User;

@RestController
public class AuthController {

	@Autowired
	AuthService authService;

	@PostMapping("/api/1.0/auth")
	AuthResponse handleAuthentication(@CurrentUser User user, @RequestBody Credentials credentials) {
		return authService.authenticate(credentials);
	}

	@PostMapping("/api/1.0/logout")
	GenericResponse handleLogout(@RequestHeader(name = "Authorization") String authorization) {
		String token = authorization.substring(7);
		authService.clearToken(token);
		return new GenericResponse("logout success");
	}
}
