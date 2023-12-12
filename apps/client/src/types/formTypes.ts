import { ChallengeFormValues } from '@/types/challenges';
import { FormActionType } from '@/components/common/constants/formActionType.enum';

export type AddForm = {
  mode: FormActionType.ADD;
};

export type EditForm = {
  mode: FormActionType.EDIT;
  initialValue: ChallengeFormValues;
};

export type ChallengeFormProp = (AddForm | EditForm) & {
  handleSubmit: (values: ChallengeFormValues) => void;
};
