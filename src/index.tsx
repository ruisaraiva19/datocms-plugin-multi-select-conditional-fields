import { connect } from 'datocms-plugin-sdk';
import { render } from './utils/render';
import { MultiSelectConditionalFields } from './entrypoints/multi-select-conditional-fields';
import 'datocms-react-ui/styles.css';

connect({
  manualFieldExtensions() {
    return [
      {
        id: 'multiSelectConditionalFields',
        name: 'Multi-Select Conditional Fields',
        type: 'addon',
        fieldTypes: ['json'],
        initialHeight: 0,
      },
    ];
  },
  renderFieldExtension(fieldExtensionId, ctx) {
    switch (fieldExtensionId) {
      case 'multiSelectConditionalFields':
        return render(<MultiSelectConditionalFields ctx={ctx} />);
    }
  },
});
