import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { create } from './form_query_data';
import { JSONSchema, FormDefinition, FormModel, config } from '@tomino/dynamic-form';
import { TestComponent } from './common';

const date = new Date('2018-10-15T00:05:32.000Z');
const signatureSchema: JSONSchema = {
  type: 'object',
  properties: {
    comment: {},
    signature: {},
    verifiedState: {},
    rejected: {
      type: 'boolean'
    },
    uid: {},
    name: {},
    date: {
      type: 'string',
      format: 'date-time'
    }
  }
};
const schema: JSONSchema = {
  type: 'object',
  properties: {
    deanSignature: signatureSchema,
    supervisorSignature: signatureSchema,
    supervisorSignature2: signatureSchema,
    supervisorSignature3: signatureSchema,
    studentSignature: signatureSchema
  }
};

const signature =
  'oiuoiu3o4uoi34u43o34kbkjh43jhbiu3y498734h34ln34oiu349873948u3ol4n3l4n3oi4j3o4u394879384yo3hj4oij34o3u94873984739843iou4hk3j4hio3uh4iu3y497834987349873984ho34ihj';
const controlData = {
  deanSignature: {
    comment: 'All wrong',
    date,
    rejected: true,
    name: 'Simeon Simoff'
  },
  supervisorSignature: {
    date,
    signature,
    name: 'Alladin Hasan'
  },
  supervisorSignature2: {
    date,
    signature,
    name: 'Alladin Hasan'
  },
  supervisorSignature3: {
    date,
    signature,
    name: 'Alladin Hasan'
  },
  studentSignature: {}
};

const formDefinition: FormDefinition = create.form({
  elements: [
    create.formElement({
      row: 0,
      column: 0,
      width: 5,
      control: 'Signature',
      label: 'Dean Signature',
      source: 'deanSignature',
      controlProps: {
        font: 'Pacifico',
        allowComment: false
      }
    }),
    create.formElement({
      row: 0,
      column: 5,
      width: 5,
      control: 'Signature',
      label: 'Supervisor Signature',
      source: 'supervisorSignature',
      controlProps: {
        font: 'Indie Flower',
        allowComment: false
      }
    }),
    create.formElement({
      row: 0,
      column: 10,
      width: 5,
      control: 'Signature',
      label: 'Student Signature',
      source: 'studentSignature',
      controlProps: {
        font: 'Charm',
        allowComment: false
      }
    }),
    create.formElement({
      row: 1,
      column: 10,
      width: 5,
      control: 'Signature',
      label: 'Student Signature',
      source: 'studentSignature',
      controlProps: {
        font: 'Charm',
        allowComment: true,
        submit: true
      }
    }),
    create.formElement({
      row: 1,
      column: 5,
      width: 5,
      control: 'Signature',
      label: 'Supervisor Signature',
      source: 'supervisorSignature2',
      controlProps: {
        font: 'Indie Flower',
        allowComment: false
      }
    }),
    create.formElement({
      row: 2,
      column: 5,
      width: 5,
      control: 'Signature',
      label: 'Supervisor Signature',
      source: 'supervisorSignature3',
      controlProps: {
        font: 'Indie Flower',
        allowComment: false
      }
    }),
    create.formElement({
      row: 2,
      column: 10,
      width: 5,
      control: 'Signature',
      label: 'Student Signature',
      source: 'studentSignature',
      controlProps: {
        font: 'Charm',
        allowComment: false,
        allowReject: true
      }
    }),
    create.formElement({
      row: 3,
      column: 10,
      width: 5,
      control: 'Signature',
      label: 'Student Signature',
      source: 'studentSignature',
      controlProps: {
        font: 'Charm',
        allowComment: true,
        allowReject: true
      }
    })
  ]
});

const results = ['Pending', 'Verified', 'Rejected'];
let ci = 0;

describe('Signature', function() {
  const setDirty = jest.fn();

  beforeAll(() => {
    config.setDirty = () => setDirty();
  });

  function componentWithData() {
    const form = new FormModel(formDefinition, schema, controlData);
    const handlers = {
      sign: () => {
        return new Promise(resolve =>
          setTimeout(() => {
            resolve({
              date,
              signature,
              name: 'Alladin Hasan',
              verifiedState: 'Verified'
            } as any);
          }, 1000)
        );
      },
      verifySignature: () => Promise.resolve(results[ci++ % 3]),
      signatureFont: () => 'Pacifico',
      validateForm: () => true
    };

    // just another notation
    return <TestComponent form={form} handlers={handlers} />;
  }

  it('renders correctly', () => {
    const component = renderer.create(componentWithData());
    expect(component).toMatchSnapshot();
  });

  // it('changes value and all related formulas', () => {
  //   const component = renderer.create(componentWithData());
  //   const root = component.root;
  //   const country = root.findByProps({ name: 'country' });
  //   country.props.onChange(null, { value: 'AU' });

  //   const city = root.findByProps({ name: 'city' });
  //   city.props.onChange(null, { value: 'SYD' });

  //   expect(component).toMatchSnapshot();
  //   expect(setDirty).toBeCalled();
  // });

  return { componentWithData };
});
