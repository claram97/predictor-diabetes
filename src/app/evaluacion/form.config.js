import * as Yup from 'yup';

export const formFields = [
  { name: 'Pregnancies', label: 'Nº de Embarazos', step: '1', initialValue: '3' },
  { name: 'Glucose', label: 'Glucosa (mg/dL)', step: '1', initialValue: '117' },
  { name: 'Insulin', label: 'Insulina (mu U/ml)', step: '1', initialValue: '25' },
  { name: 'BMI', label: 'Índice de Masa Corporal (IMC)', step: '0.1', initialValue: '32.0' },
  { name: 'DiabetesPedigreeFunction', label: 'Función de Pedigrí de Diabetes', step: '0.001', initialValue: '0.365' },
  { name: 'Age', label: 'Edad (años)', step: '1', initialValue: '29' }
];

export const validationSchema = Yup.object({
  Pregnancies: Yup.number().min(0, 'No puede ser negativo').required('Campo obligatorio'),
  Glucose: Yup.number().min(0, 'No puede ser negativo').required('Campo obligatorio'),
  Insulin: Yup.number().min(0, 'No puede ser negativo').required('Campo obligatorio'),
  BMI: Yup.number().min(0, 'No puede ser negativo').required('Campo obligatorio'),
  DiabetesPedigreeFunction: Yup.number().min(0, 'No puede ser negativo').required('Campo obligatorio'),
  Age: Yup.number().positive('Debe ser un número positivo').integer('Debe ser un número entero').required('Campo obligatorio'),
});

export const initialValues = formFields.reduce((acc, field) => {
  acc[field.name] = field.initialValue;
  return acc;
}, {});