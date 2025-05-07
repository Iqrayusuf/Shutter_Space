/*package ShutterSpace.LearningPlan_backend.mapper;

public class ResourceMapper {
}
*/

/*package ShutterSpace.LearningPlan_backend.mapper;

import ShutterSpace.LearningPlan_backend.dto.ResourceDto;
import ShutterSpace.LearningPlan_backend.entity.Resource;

public class ResourceMapper {

    public static ResourceDto mapToResourceDto(Resource resource) {
        return new ResourceDto(
                resource.getId(),
                resource.getType(),
                resource.getUrl() // ✅ Fix this line
        );
    }
}
*/

/*package ShutterSpace.LearningPlan_backend.mapper;

import ShutterSpace.LearningPlan_backend.dto.ResourceDto;
import ShutterSpace.LearningPlan_backend.entity.Resource;

public class ResourceMapper {

    public static ResourceDto mapToResourceDto(Resource resource) {
        return new ResourceDto(
                resource.getId(),
                resource.getType(),
                resource.getUrl()
                resource.getName()
        );
    }
    public static Resource mapToResource(ResourceDto dto) {
        Resource resource = new Resource();
        resource.setId(dto.getId());
        resource.setType(dto.getType());
        resource.setUrl(dto.getUrl());
        return resource;
    }
}

*/


package ShutterSpace.LearningPlan_backend.mapper;

import ShutterSpace.LearningPlan_backend.dto.ResourceDto;
import ShutterSpace.LearningPlan_backend.entity.Resource;

public class ResourceMapper {

    public static ResourceDto mapToResourceDto(Resource resource) {
        return new ResourceDto(
                resource.getId(),
                resource.getType(),
                resource.getUrl(),
                (String) resource.getName() // Add this fourth parameter
        );
    }

    public static Resource mapToResource(ResourceDto dto) {
        Resource resource = new Resource();
        resource.setId(dto.getId());
        resource.setType(dto.getType());
        resource.setUrl(dto.getUrl());
        resource.setName(dto.getName()); // Add this line to map the name field
        return resource;
    }
}

