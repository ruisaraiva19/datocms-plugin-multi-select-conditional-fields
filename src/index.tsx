import { connect } from 'datocms-plugin-sdk';
import { render } from './utils/render';
import { MultiSelectConditionalFields } from './entrypoints/multi-select-conditional-fields';
import 'datocms-react-ui/styles.css';
import { MultiSelectConditionalFieldsConfigScreen } from './entrypoints/multi-select-conditional-fields-config-screen';

const FIELD_EXTENSION_ID = 'multiSelectConditionalFields';

connect({
  manualFieldExtensions() {
    return [
      {
        id: FIELD_EXTENSION_ID,
        name: 'Multi-Select Conditional Fields',
        type: 'addon',
        fieldTypes: ['json'],
        initialHeight: 0,
        configurable: true,
      },
    ];
  },
  renderFieldExtension(fieldExtensionId, ctx) {
    switch (fieldExtensionId) {
      case FIELD_EXTENSION_ID:
        return render(<MultiSelectConditionalFields ctx={ctx} />);
    }
  },
  renderManualFieldExtensionConfigScreen(fieldExtensionId, ctx) {
    switch (fieldExtensionId) {
      case FIELD_EXTENSION_ID:
        return render(<MultiSelectConditionalFieldsConfigScreen ctx={ctx} />);
    }
  },
});
