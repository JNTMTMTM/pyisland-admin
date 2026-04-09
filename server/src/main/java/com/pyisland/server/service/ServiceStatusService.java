package com.pyisland.server.service;

import com.pyisland.server.entity.ServiceStatus;
import com.pyisland.server.repository.ServiceStatusMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServiceStatusService {

    private final ServiceStatusMapper serviceStatusMapper;

    public ServiceStatusService(ServiceStatusMapper serviceStatusMapper) {
        this.serviceStatusMapper = serviceStatusMapper;
    }

    public ServiceStatus getByApiName(String apiName) {
        return serviceStatusMapper.selectByApiName(apiName);
    }

    public List<ServiceStatus> listAll() {
        return serviceStatusMapper.selectAll();
    }

    public ServiceStatus updateStatus(String apiName, Boolean status, String message, String remark) {
        ServiceStatus existing = serviceStatusMapper.selectByApiName(apiName);
        if (existing != null) {
            existing.setStatus(status);
            existing.setMessage(message);
            existing.setRemark(remark);
            existing.setUpdatedAt(LocalDateTime.now());
            serviceStatusMapper.update(existing);
            return existing;
        } else {
            ServiceStatus ss = new ServiceStatus();
            ss.setApiName(apiName);
            ss.setStatus(status);
            ss.setMessage(message);
            ss.setRemark(remark);
            ss.setUpdatedAt(LocalDateTime.now());
            serviceStatusMapper.insert(ss);
            return ss;
        }
    }
}
