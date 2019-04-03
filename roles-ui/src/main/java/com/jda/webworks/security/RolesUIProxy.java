package com.jda.webworks.security;

import java.util.List;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jda.webworks.security.beans.RolesBean;

//@FeignClient(name="security-roles-backend")
@FeignClient(name="netflix-zuul-api-gateway-server")
@RibbonClient(name="roles-backend")
public interface RolesUIProxy {

	//@RequestMapping("/allRoles/json")
	@RequestMapping("roles-backend/allRoles/json")
	public List<RolesBean> getAllRolesJson();
}
