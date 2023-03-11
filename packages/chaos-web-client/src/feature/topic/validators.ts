import * as yup from 'yup'

import { REQUIRED_FIELD_MSG } from '@/shared/utils/validators'

export const TOPIC_TITLE_SCHEMA = yup
  .string()
  .min(1, REQUIRED_FIELD_MSG)
  .required(REQUIRED_FIELD_MSG)

export const TOPIC_DESCRIPTION_SCHEMA = yup
  .string()
  .min(1, REQUIRED_FIELD_MSG)
  .required(REQUIRED_FIELD_MSG)
