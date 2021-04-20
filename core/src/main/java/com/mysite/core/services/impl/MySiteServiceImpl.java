package com.mysite.core.services.impl;

import org.osgi.service.component.annotations.Component;

import com.mysite.core.services.MySiteService;

@Component(service = MySiteService.class)
public class MySiteServiceImpl implements MySiteService {

    @Override
    public String evaluate(String a, String b) {
        return a.toUpperCase()+b.toUpperCase();
    }
}
