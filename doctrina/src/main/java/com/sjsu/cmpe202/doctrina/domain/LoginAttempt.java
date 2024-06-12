package com.sjsu.cmpe202.doctrina.domain;

import java.time.LocalDateTime;

public record LoginAttempt(String email,
                           boolean success,
                           LocalDateTime createdAt) {

}
