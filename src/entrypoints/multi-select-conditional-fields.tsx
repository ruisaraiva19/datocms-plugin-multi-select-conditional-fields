import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { useCallback, useEffect, useMemo } from 'react';
import { typedBoolean } from '../utils/misc';

type PropTypes = {
  ctx: RenderFieldExtensionCtx;
};

export function MultiSelectConditionalFields({ ctx }: PropTypes) {
  const sourceField = ctx.field;
  let rawOptions = sourceField.attributes.appearance.parameters.options as any[];
  if (!Array.isArray(rawOptions)) {
    rawOptions = [];
  }
  const targetFieldsApiKey = rawOptions.map((option) => option.value) as string[];

  const targetFields = useMemo(() => {
    return targetFieldsApiKey
      .map((targetFieldApiKey) => {
        const targetField = Object.values(ctx.fields)
          .filter(typedBoolean)
          .find((field) => {
            return (
              field.attributes.api_key === targetFieldApiKey &&
              field.relationships.item_type.data.id === sourceField.relationships.item_type.data.id
            );
          });

        if (!targetField) {
          console.error(`Plugin error: The field "${targetFieldApiKey}" does not exist`);
          return null;
        }

        return targetField;
      })
      .filter((x) => x);
  }, [ctx.fields, targetFieldsApiKey, sourceField]);

  const toggleFields = useCallback(
    (fieldsToShow: string[]) => {
      targetFields.filter(typedBoolean).forEach((targetField) => {
        const targetPath = targetField.attributes.api_key;

        if (targetField.attributes.localized) {
          ctx.toggleField(`${targetPath}.${ctx.locale}`, fieldsToShow.includes(targetPath));
        } else {
          ctx.toggleField(targetPath, fieldsToShow.includes(targetPath));
        }
      });
    },
    [ctx, sourceField.attributes.localized, targetFields]
  );

  const fieldRawValue = ctx.formValues[sourceField.attributes.api_key] as any;
  const optionsFieldValue =
    (sourceField.attributes.localized ? (fieldRawValue[ctx.locale] as string) : (fieldRawValue as string)) || '[]';

  const currentValue = JSON.parse(optionsFieldValue) as string[];

  useEffect(() => {
    toggleFields(currentValue);
  }, [currentValue]);

  return null;
}
