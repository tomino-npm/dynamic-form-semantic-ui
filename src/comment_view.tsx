import * as React from 'react';

import { FormControlProps } from './common';
import { Message } from 'semantic-ui-react';
import { config } from '@tomino/dynamic-form';

export class CommentView extends React.Component<FormControlProps> {
  render() {
    const {
      formControl: { source },
      owner
    } = this.props;

    return (
      <Message
        icon="comments outline"
        header={config.i18n`Comment`}
        color="yellow"
        content={owner.getValue(source)}
      />
    );
  }
}
