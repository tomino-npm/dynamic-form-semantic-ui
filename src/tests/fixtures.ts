// import * as fs from 'fs';
// import * as path from 'path';

import { FormDefinition, JSONSchema } from '@tomino/dynamic-form';

const user = {
  id: 'uid',
  uid: 'uid'
};

export const signatureSchema: JSONSchema = {
  type: 'object',
  properties: {
    comment: { type: 'string' },
    signature: { type: 'string' },
    verifiedState: { type: 'string', enum: ['Verified', 'Rejected'] },
    rejected: { type: 'boolean' },
    uid: { type: 'string' },
    name: { type: 'string' },
    date: { type: 'string', format: 'date-time' }
  },
  required: ['name'],
  errorMessage: {
    required: {
      name: 'Missing signature'
    }
  }
};

// tslint:disable-next-line:no-console
// console.log('Creating schemas ...');

export const personSchema: JSONSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    middleName: { type: 'string' },
    lastName: { type: 'string' },
    fullName: { type: 'string' },
    gender: { type: 'string', enum: ['M', 'F', 'Other'] },
    email: {
      type: 'string',
      pattern:
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
      errorMessage: {
        pattern: 'Invalid email'
      }
    },
    uid: { type: 'string' }
  },
  required: ['firstName', 'lastName', 'fullName', 'email']
};

// insert schema

export const person = {
  id: 'p1',
  name: 'person',
  description: 'Personal data of a user',
  schema: personSchema
};

export const signature = {
  id: 's1',
  name: 'signature',
  description: 'Schema of a signature',
  schema: signatureSchema
};

const schemas = {
  person,
  signature
};

// tslint:disable-next-line:no-console
// console.log('Creating resources ...');

/* =========================================================
      SCHEMAS
     ======================================================== */

//#region Schemas

export const baseSchema: JSONSchema = {
  type: 'object',
  properties: {
    person: {
      $import: schemas.person.id,
      required: ['fullName', 'uid', 'email']
    },
    supervisor: {
      type: 'string',
      $enum: [
        { value: '30031001', text: 'Trish Saladine' },
        { value: '30031003', text: 'Jodie Clark' }
      ]
    },
    unit: {
      type: 'string',
      $enum: [
        { value: '30031002', text: 'Engineering Unit 1' },
        { value: '30031004', text: 'Engineering Unit 2' }
      ]
    },
    requestConsumables: { type: 'boolean', validationGroup: 'request' },
    requestMinorEquipment: {
      type: 'boolean',
      validationGroup: 'request',
      errorMessage: 'Select at least one category'
    },
    requestSoftware: { type: 'boolean', validationGroup: 'request' },
    requestThesis: { type: 'boolean', validationGroup: 'request' },
    statement: { type: 'string' },
    amount: { type: 'number', maximum: 650, minimum: 0 }
  },
  required: ['unit', 'statement', 'amount', 'supervisor'],
  anyOf: [
    {
      required: ['requestConsumables'],
      errorMessage: {
        required: 'Select at least one category'
      }
    },
    {
      required: ['requestMinorEquipment'],
      errorMessage: {
        required: 'Select at least one category'
      }
    },
    {
      required: ['requestSoftware'],
      errorMessage: {
        required: 'Select at least one category'
      }
    },
    {
      required: ['requestThesis'],
      errorMessage: {
        required: 'Select at least one category'
      }
    }
  ]
};

export const studentSchema: JSONSchema = {
  type: 'object',
  properties: {
    studentSignature: {
      $import: schemas.signature.id
    }
  }
};

export const supervisorSchema: JSONSchema = {
  type: 'object',
  properties: {
    supervisorSignature: {
      $import: schemas.signature.id
    },
    studentSignature: {
      $import: schemas.signature.id
    }
  }
};

export const unitCoordinatorSchema: JSONSchema = {
  type: 'object',
  properties: {
    unitCoordinatorSignature: {
      $import: schemas.signature.id
    },
    studentSignature: {
      $import: schemas.signature.id
    }
  }
};

export const adminValidationSchema: JSONSchema = {
  type: 'object',
  properties: {
    adminComment: {
      type: 'string'
    },
    formValid: {
      type: 'boolean'
    }
  }
};

export const userAdjustmentSchema: JSONSchema = {
  type: 'object',
  properties: {
    adminComment: {
      type: 'string'
    },
    studentSignature: {
      $import: schemas.signature.id
    }
  }
};

export const completeSchema: JSONSchema = {
  type: 'object',
  properties: {
    supervisorSignature: {
      $import: schemas.signature.id
    },
    unitCoordinatorSignature: {
      $import: schemas.signature.id
    },
    studentSignature: {
      $import: schemas.signature.id
    }
  }
};

//#endregion

// info document
const info = ''; // fs.readFileSync(path.resolve('./src/fixtures/spf_info.md'), { encoding: 'utf-8' });

/* =========================================================
      FORMS
     ======================================================== */

//#region Forms

export const baseForm: FormDefinition = {
  name: 'Application Form',
  description: 'Application form for the project funding ',
  elements: [
    // row 0
    {
      label: 'Logo',
      control: 'Image',
      controlProps: {
        width: '300px'
      },
      url: 'https://d20xd7mbt7xiju.cloudfront.net/test/wsu/WSU_logo.jpg',
      column: 0,
      width: 4,
      row: 0
    },
    {
      label: 'School of Computing, Engineering and Mathematics',
      control: 'Text',
      column: 4,
      width: 12,
      controlProps: {
        style: { textAlign: 'right', fontWeight: 'bold', fontSize: '18px' }
      },
      row: 0
    },

    // row 1

    {
      label: '2019 U/G Engineering Student Project Funding Application Form',
      control: 'Text',
      row: 1,
      column: 0,
      width: 16,
      controlProps: {
        style: { textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginBottom: '12px' }
      }
    },

    // row 2

    {
      label: 'Student Name',
      control: 'Input',
      source: 'person.fullName',
      row: 2,
      column: 0,
      width: 8
    },

    {
      label: 'Student ID',
      control: 'Input',
      source: 'person.uid',
      row: 2,
      column: 8,
      width: 8
    },

    // row 3

    {
      label: 'Email',
      control: 'Input',
      source: 'person.email',
      row: 3,
      column: 0,
      width: 8
    },

    {
      label: 'Unit Number',
      control: 'Select',
      source: 'unit',
      list: 'unit',
      row: 3,
      column: 8,
      width: 8
    },

    // row 4

    {
      label: 'Supervisor’s name',
      control: 'Select',
      source: 'supervisor',
      list: 'supervisor',
      row: 4,
      column: 0,
      width: 8
    },

    // row 5

    {
      label: 'Please select the categories from which your funds will be expended:',
      control: 'Text',
      row: 5,
      column: 0,
      width: 16
    },

    // row 6

    {
      label: 'Consumables ',
      control: 'Checkbox',
      source: 'requestConsumables',
      row: 6,
      column: 0,
      width: 4
    },
    {
      label: 'Minor Equipment  ',
      control: 'Checkbox',
      source: 'requestMinorEquipment',
      row: 6,
      column: 4,
      width: 4
    },
    {
      label: 'Specialist Software',
      control: 'Checkbox',
      source: 'requestSoftware',
      row: 6,
      column: 8,
      width: 4
    },
    {
      label: 'Thesis printing/bindin ',
      control: 'Checkbox',
      source: 'requestThesis',
      row: 6,
      column: 12,
      width: 4
    },

    // row 7

    {
      label:
        'Statement detailing the resources required, the purposes and activities proposed, the service provider, itemised costs and the quote',
      control: 'Textarea',
      source: 'statement',
      row: 7,
      column: 0,
      width: 16
    },

    // row 8

    {
      label: 'Total Amount requested',
      control: 'Input',
      source: 'amount',
      controlProps: {
        label: '$',
        labelPosition: 'left'
      },
      row: 8,
      column: 0,
      width: 8
    },

    {
      label:
        '(<b>maximum amount - $650</b> this covers Engineering Project and Honours Thesis units – see conditions of funding on page 1)',
      control: 'Text',
      row: 8,
      column: 8,
      width: 8
    }
  ]
};

export const studentForm: FormDefinition = {
  name: 'Funding Application Form',
  elements: [
    { row: 0, column: 0, width: 16, control: 'Form', sourceRef: 'baseForm' },
    {
      row: 1,
      column: 0,
      label: 'Student Signature',
      control: 'Signature',
      source: 'studentSignature',
      controlProps: {
        submit: true
      }
    }
  ]
};

export const supervisorForm: FormDefinition = {
  name: 'Funding Application Form',
  elements: [
    { row: 0, column: 0, width: 16, control: 'Form', sourceRef: 'baseForm', readOnly: true },
    {
      row: 1,
      column: 0,
      label: 'Supervisor Signature',
      control: 'Signature',
      source: 'supervisorSignature',
      controlProps: {
        submit: true,
        allowComment: true,
        allowReject: true
      }
    }
  ]
};

export const unitCoordinatorForm: FormDefinition = {
  name: 'Funding Application Form',
  elements: [
    { row: 0, column: 0, width: 16, control: 'Form', sourceRef: 'baseForm' },
    {
      row: 1,
      column: 0,
      label: 'Unit Coordinator Signature',
      control: 'Signature',
      source: 'unitCoordinatorSignature',
      controlProps: {
        submit: true,
        allowComment: true,
        allowReject: true
      }
    }
  ]
};

export const adminValidationForm: FormDefinition = {
  name: 'Admin Validation Form',

  elements: [
    { row: 0, column: 0, width: 16, control: 'Form', sourceRef: 'baseForm' },
    {
      row: 1,
      column: 0,
      width: 16,
      label: 'Comment',
      control: 'Textarea',
      source: 'adminComment'
    },
    {
      row: 2,
      column: 2,
      width: 2,
      source: 'formValid',
      control: 'ApproveButton'
    },
    {
      row: 2,
      column: 0,
      width: 2,
      source: 'formValid',
      control: 'RejectButton'
    }
  ]
};

export const userAdjustmentForm: FormDefinition = {
  name: 'User Adjustment - Funding Application Form',
  elements: [
    { row: 0, column: 0, width: 16, control: 'Form', sourceRef: 'baseForm' },
    {
      row: 1,
      column: 0,
      width: 16,
      label: 'Comment',
      control: 'Comment',
      source: 'adminComment'
    },
    {
      row: 1,
      column: 0,
      label: 'Student Signature',
      control: 'Signature',
      source: 'studentSignature',
      controlProps: {
        submit: true
      }
    }
  ]
};

export const completeForm: FormDefinition = {
  name: 'Funding Application Form',

  elements: [
    { row: 0, column: 0, width: 16, control: 'Form', sourceRef: 'adminValidation' },
    {
      row: 1,
      column: 0,
      width: 4,
      label: 'Student Signature',
      control: 'Signature',
      source: 'studentSignature',
      controlProps: {
        submit: true
      }
    },
    {
      row: 1,
      column: 4,
      width: 4,
      label: 'Supervisor Signature',
      control: 'Signature',
      source: 'supervisorSignature',
      controlProps: {
        submit: true,
        allowComment: true
      }
    },
    {
      row: 1,
      column: 8,
      width: 4,
      label: 'Unit Coordinator Signature',
      control: 'Signature',
      source: 'unitCoordinatorSignature',
      controlProps: {
        submit: true,
        allowComment: true
      }
    }
  ]
};

export const completeStudentPositiveForm: FormDefinition = {
  name: 'Funding Application Form',
  elements: [
    {
      row: 0,
      column: 0,
      width: 16,
      control: 'Text',
      label: `<h3>Your funding request was approved!</h3>
Please see the form below for your reference.
<hr />
      `
    },
    { row: 1, column: 0, width: 16, control: 'Form', sourceRef: 'completeForm' }
  ]
};

export const completeStudentNegativeForm: FormDefinition = {
  name: 'Funding Application Form',
  elements: [
    {
      row: 0,
      column: 0,
      width: 16,
      control: 'Text',
      label: `<h3><b>Your funding request was rejected ;(</b></h3>
Please see the form below for your reference.<br />
<hr />
<br />

      `
    },
    { row: 1, column: 0, width: 16, control: 'Form', sourceRef: 'completeForm' }
  ]
};

export const completeTechForm: FormDefinition = {
  name: 'Funding Application Form',
  elements: [
    {
      row: 0,
      column: 0,
      width: 16,
      control: 'Text',
      label: `Dear Tech Support<br />
<h3>Following student request for funding was approved. Please proceed with purchase.</h3>
Thank you!<br />
<br />
<hr />
      `
    },
    { row: 1, column: 0, width: 16, control: 'Form', sourceRef: 'completeForm' }
  ]
};

//#endregion

/* =========================================================
      RESOURCES
     ======================================================== */

//#region Resources

export const baseFormResource = {
  refName: 'baseForm',
  type: 'Form',
  createdById: user.uid,
  title: 'Funding Application Form',
  model: baseForm,
  schema: baseSchema
};

export const completeFormResource = {
  refName: 'completeForm',
  type: 'Form',
  createdById: user.uid,
  title: 'Funding Application Form',
  model: completeForm,
  schema: completeSchema
};

export const studentFormResource = {
  refName: 'studentForm',
  type: 'Form',
  createdById: user.uid,
  title: 'Funding Application Form',
  model: studentForm,
  schema: studentSchema
};

export const supervisorFormResource = {
  refName: 'supervisorForm',
  type: 'Form',
  createdById: user.uid,
  title: 'Funding Application Form',
  model: supervisorForm,
  schema: supervisorSchema
};

export const unitCoordinatorFormResource = {
  refName: 'unitCoordinatorForm',
  type: 'Form',
  createdById: user.uid,
  title: 'Funding Application Form',
  model: unitCoordinatorForm,
  schema: unitCoordinatorSchema
};

export const documentResource = {
  refName: 'document',
  type: 'Document',
  createdById: user.uid,
  title: 'Guidelines',
  text: info,
  contentType: 'Markdown'
};

export const adminValidationResource = {
  refName: 'adminValidation',
  type: 'Form',
  createdById: user.uid,
  title: 'Admin Validation Form',
  model: adminValidationForm,
  schema: adminValidationSchema
};

export const userAdjustmentResource = {
  refName: 'userAdjustment',
  type: 'Form',
  createdById: user.uid,
  title: 'User Adjustment - Funding Application Form',
  model: userAdjustmentForm,
  schema: userAdjustmentSchema
};

export const notifyStudentPositiveResource = {
  refName: 'notifyStudentPositive',
  type: 'Form',
  createdById: user.uid,
  title: 'Notify Student Email',
  model: completeStudentPositiveForm,
  schema: completeSchema
};

export const notifyStudentNegativeResource = {
  refName: 'notifyStudentNegative',
  type: 'Form',
  createdById: user.uid,
  title: 'Notify Student Email',
  model: completeStudentNegativeForm,
  schema: completeSchema
};

export const notifyTechResource = {
  refName: 'notifyTech',
  type: 'Form',
  createdById: user.uid,
  title: 'Notify Tech Email',
  model: completeTechForm,
  schema: completeSchema
};

//#endregion
