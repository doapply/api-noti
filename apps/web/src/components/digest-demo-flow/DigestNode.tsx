import { Handle, Position } from 'react-flow-renderer';
import { createStyles, NumberInput, Loader } from '@mantine/core';
import styled from '@emotion/styled';

import { NodeStep } from './NodeStep';
import { DigestGradient } from '../../design-system/icons';
import { useDigestDemoFlowContext } from './DigestDemoFlowProvider';
import { Indicator } from './Indicator';
import { CountdownTimer } from '../../design-system/icons';
import { colors } from '../../design-system';

const LoaderStyled = styled(Loader)`
  position: absolute;
  bottom: 4px;
  right: 4px;
`;

export const useNumberInputStyles = createStyles((theme) => {
  const dark = theme.colorScheme === 'dark';

  return {
    icon: {
      color: dark ? colors.white : colors.B40,
      width: 24,
      height: 24,
      top: 8,
    },
    input: {
      fontSize: 16,
      textAlign: 'center',
      paddingLeft: '24px !important',
      border: 'none',
      width: 110,
      backgroundColor: 'transparent',
      '&:disabled': {
        backgroundColor: 'transparent',
      },
    },
    control: {
      border: 'none',
      borderRadius: 4,
    },
  };
});

export function DigestNode({ data, id }: { data: any; id: string }) {
  const { isReadOnly, triggerCount, isRunningDigest, digestInterval, updateDigestInterval } =
    useDigestDemoFlowContext();
  const { classes } = useNumberInputStyles();

  return (
    <NodeStep
      data={data}
      id={id}
      Icon={DigestGradient}
      ContentItem={
        <>
          <Indicator isShown={!isReadOnly && triggerCount > 0} value={triggerCount > 99 ? '99' : `${triggerCount}`} />
          {isRunningDigest && <LoaderStyled color={colors.B70} size={16} />}
        </>
      }
      ActionItem={
        !isReadOnly && (
          <NumberInput
            value={digestInterval}
            onChange={updateDigestInterval}
            max={30}
            min={10}
            parser={(value) => (value ?? '').replace(/( \w+)|(\D{1,3})/g, '')}
            formatter={(value) => `${value} sec`}
            icon={<CountdownTimer />}
            disabled={isRunningDigest}
            classNames={classes}
          />
        )
      }
      Handlers={() => {
        return (
          <>
            <Handle type="target" id="b" position={Position.Top} />
            <Handle type="source" id="a" position={Position.Bottom} />
          </>
        );
      }}
    />
  );
}
