package com.pyisland.server.repository;

import com.pyisland.server.entity.ServiceStatus;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ServiceStatusMapper {

    ServiceStatus selectByApiName(@Param("apiName") String apiName);

    java.util.List<ServiceStatus> selectAll();

    int update(ServiceStatus serviceStatus);

    int insert(ServiceStatus serviceStatus);
}
