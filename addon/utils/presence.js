import { isPresent } from '@ember/utils';

export default function presence(value) {
  return isPresent(value) ? value : null;
}
