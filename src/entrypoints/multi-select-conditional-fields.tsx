import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';

type PropTypes = {
  ctx: RenderFieldExtensionCtx;
};

export function MultiSelectConditionalFields({ ctx }: PropTypes) {
  const rawOptions = ctx.field.attributes.appearance.parameters.options;
  if (!Array.isArray(rawOptions)) {
    return null;
  }
  const allOptions = rawOptions.map((option) => option.value) as string[];
  const optionsFieldValue = ctx.formValues[ctx.fieldPath] as string || '[]';
  try {
    const parsedOptionsFieldValue = JSON.parse(optionsFieldValue);
    if (Array.isArray(parsedOptionsFieldValue)) {
      allOptions.forEach((option) => {
        ctx.toggleField(option, parsedOptionsFieldValue.includes(option));
      });
    }
  } catch (error) {
    console.error('[MultiSelectConditionalFields]', error);
  }
  return null;
}
