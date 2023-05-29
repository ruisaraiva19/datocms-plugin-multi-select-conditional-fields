import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, Form, SelectField, SwitchField } from 'datocms-react-ui';
import { useCallback, useState } from 'react';
import { typedBoolean, Parameters } from '../utils/misc';

type PropTypes = {
  ctx: RenderManualFieldExtensionConfigScreenCtx;
};

export function MultiSelectConditionalFieldsConfigScreen({ ctx }: PropTypes) {
  const { invert = false, targetFieldsApiKey = [] } = ctx.parameters as Partial<Parameters>;
  const [formValues, setFormValues] = useState<Parameters>({ invert, targetFieldsApiKey });

  const update = useCallback(
    (field: string, value: any) => {
      const newParameters = { ...formValues, [field]: value };
      setFormValues(newParameters);
      ctx.setParameters(newParameters);
    },
    [formValues, setFormValues, ctx.setParameters]
  );

  const options = Object.values(ctx.fields)
    .filter(typedBoolean)
    .filter((field) => field.relationships.item_type.data.id === ctx.itemType.id && field.id !== ctx.pendingField.id)
    .map((field) => ({
      label: field.attributes.label,
      value: field.attributes.api_key,
    }));

  return (
    <Canvas ctx={ctx}>
      <Form>
        <SelectField
          id="targetFieldsApiKey"
          name="targetFieldsApiKey"
          label="Target fields to be hidden/shown"
          hint="When options are selected, it will use them instead of either Multi-select input or Checkbox Group input options. Useful for when using a field editor other than Multi-select input or Checkbox Group input."
          selectInputProps={{ isMulti: true, options }}
          value={formValues.targetFieldsApiKey
            .map((apiKey) => options.find((o) => o.value === apiKey))
            .filter(typedBoolean)}
          onChange={(selectedOptions) => {
            update(
              'targetFieldsApiKey',
              selectedOptions.map((o) => o.value)
            );
          }}
        />
        <SwitchField
          id="invert"
          name="invert"
          label="Invert visibility?"
          hint="When this field is checked, hide target fields"
          value={formValues.invert}
          onChange={update.bind(null, 'invert')}
        />
      </Form>
    </Canvas>
  );
}
