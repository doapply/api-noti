import { ChangeTemplateActiveStatus } from './change-template-active-status/change-template-active-status.usecase';
import { UpdateNotificationTemplate } from './update-notification-template/update-notification-template.usecase';
import { GetNotificationTemplates } from './get-notification-templates/get-notification-templates.usecase';
import { CreateNotificationTemplate } from './create-notification-template';
import { GetNotificationTemplate } from './get-notification-template/get-notification-template.usecase';
import { DeleteNotificationTemplate } from './delete-notification-template/delete-notification-template.usecase';
import { GetBlueprintNotificationTemplate } from './get-blueprint-notification-template/get-blueprint-notification-template.usecase';
import { CreateBlueprintNotificationTemplate } from './create-blueprint-notification-template/create-blueprint-notification-template.usecase';

export const USE_CASES = [
  //
  ChangeTemplateActiveStatus,
  UpdateNotificationTemplate,
  GetNotificationTemplates,
  CreateNotificationTemplate,
  GetNotificationTemplate,
  DeleteNotificationTemplate,
  GetBlueprintNotificationTemplate,
  CreateBlueprintNotificationTemplate,
];
