import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { FormView } from '../form_view';
import { FormModel } from '@tomino/dynamic-form';

type Props = {
  form: FormModel;
  handlers?: any;
};

export const TestComponent: React.FC<Props> = ({ form, handlers }) => {
  return (
    <Segment className="ui form">
      <Header content="Standard" dividing />
      <FormView formControl={form} owner={form.dataSet} readOnly={false} handlers={handlers} />
      <Header content="Readonly" dividing />
      <FormView formControl={form} owner={form.dataSet} readOnly={true} handlers={handlers} />
    </Segment>
  );
};
