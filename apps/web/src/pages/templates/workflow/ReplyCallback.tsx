import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mantine/core';

import { Input, Switch, Text } from '../../../design-system';
import { useEnvController } from '../../../hooks';
import { When } from '../../../components/utils/When';
import { DoubleArrowRight } from '../../../design-system/icons/arrows/CircleArrowRight';

export const ReplyCallback = ({ control, index, errors }) => {
  const { environment } = useEnvController();
  const { watch } = useFormContext();
  const replyCallbackActive = watch(`steps.${index}.replyCallback.active`);

  const domainMxRecordConfigured =
    environment?.dns?.inboundParseDomain && environment?.dns?.mxRecordConfigured === true;

  return (
    <>
      <ReplyCallbackSwitch index={index} control={control} />
      <When truthy={!domainMxRecordConfigured && replyCallbackActive}>
        <LackConfigurationError
          text={
            'Looks like you haven’t configured your domain mx record or ' +
            'added your domain to the allowed domain list under email settings yet.'
          }
          redirectTo={'/settings'}
        />
      </When>
      <ReplyCallbackUrlInput index={index} control={control} />
    </>
  );
};

export const ReplyCallbackUrlInput = ({ control, index }) => {
  const { readonly } = useEnvController();
  const { watch } = useFormContext();
  const replyCallbackActive = watch(`steps.${index}.replyCallback.active`);

  return (
    <When truthy={replyCallbackActive}>
      <Controller
        control={control}
        name={`steps.${index}.replyCallback.url`}
        defaultValue=""
        render={({ field: { value, ...field } }) => {
          return (
            <Input
              {...field}
              data-test-id="reply-callback-url-input"
              disabled={readonly}
              type={'url'}
              required={!!replyCallbackActive}
              value={value || ''}
              label="Replay callback URL"
              placeholder="e.g. www.user-domain.com/reply"
            />
          );
        }}
      />
    </When>
  );
};

export const ReplyCallbackSwitch = ({ control, index }) => {
  const { readonly } = useEnvController();

  return (
    <>
      <Controller
        control={control}
        name={`steps.${index}.replyCallback.active`}
        defaultValue={false}
        render={({ field: { value, ...field } }) => {
          return (
            <StyledSwitch
              {...field}
              disabled={readonly}
              checked={value}
              label="Enable reply callbacks"
              data-test-id="step-replay-callbacks-switch"
            />
          );
        }}
      />
    </>
  );
};

export function LackConfigurationError({ text, redirectTo }: { text: string; redirectTo: string }) {
  const navigate = useNavigate();

  return (
    <>
      <Grid align={'center'} m={0}>
        <WarningMessage>
          <Grid.Col p={0} span={11}>
            <Text>{text}</Text>
          </Grid.Col>
          <Grid.Col p={0} span={'content'}>
            <DoubleArrowRight onClick={() => navigate(redirectTo)} />
          </Grid.Col>
        </WarningMessage>
      </Grid>
    </>
  );
}

const WarningMessage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  color: #e54545;
  background: rgba(230, 69, 69, 0.15);
  border-radius: 7px;
`;

const StyledSwitch = styled(Switch)`
  max-width: 100% !important;
`;
