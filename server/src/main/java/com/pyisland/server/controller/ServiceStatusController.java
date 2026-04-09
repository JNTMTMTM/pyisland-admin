package com.pyisland.server.controller;

import com.pyisland.server.entity.ServiceStatus;
import com.pyisland.server.service.ServiceStatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/service-status")
public class ServiceStatusController {

    private final ServiceStatusService serviceStatusService;

    public ServiceStatusController(ServiceStatusService serviceStatusService) {
        this.serviceStatusService = serviceStatusService;
    }

    @GetMapping
    public ResponseEntity<?> getStatus(@RequestParam String apiName) {
        ServiceStatus status = serviceStatusService.getByApiName(apiName);
        if (status == null) {
            return ResponseEntity.ok(Map.of(
                    "code", 404,
                    "message", "接口不存在"
            ));
        }
        Map<String, Object> data = new HashMap<>();
        data.put("apiName", status.getApiName());
        data.put("status", status.getStatus());
        data.put("message", status.getMessage());
        data.put("remark", status.getRemark() != null ? status.getRemark() : "");
        data.put("updatedAt", status.getUpdatedAt() != null ? status.getUpdatedAt().toString() : "");
        return ResponseEntity.ok(Map.of(
                "code", 200,
                "message", "success",
                "data", data
        ));
    }

    @GetMapping("/list")
    public ResponseEntity<?> listAll() {
        var list = serviceStatusService.listAll();
        return ResponseEntity.ok(Map.of(
                "code", 200,
                "message", "success",
                "data", list
        ));
    }

    @PutMapping
    public ResponseEntity<?> updateStatus(@RequestBody UpdateStatusRequest request) {
        if (request.apiName() == null || request.apiName().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "code", 400,
                    "message", "接口名称不能为空"
            ));
        }
        if (request.status() == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "code", 400,
                    "message", "接口状态不能为空"
            ));
        }
        ServiceStatus updated = serviceStatusService.updateStatus(
                request.apiName(), request.status(), request.message(), request.remark());
        Map<String, Object> data = new HashMap<>();
        data.put("apiName", updated.getApiName());
        data.put("status", updated.getStatus());
        data.put("message", updated.getMessage());
        data.put("remark", updated.getRemark() != null ? updated.getRemark() : "");
        data.put("updatedAt", updated.getUpdatedAt() != null ? updated.getUpdatedAt().toString() : "");
        return ResponseEntity.ok(Map.of(
                "code", 200,
                "message", "接口状态更新成功",
                "data", data
        ));
    }

    public record UpdateStatusRequest(String apiName, Boolean status, String message, String remark) {
    }
}
