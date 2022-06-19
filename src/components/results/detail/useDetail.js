import { computed } from 'vue'
import getResourceURL from '@/helpers/resourceURL';

export const detailProps = {
  file: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
}

export function useDetail(props){
  const resourceURL = computed(
    () => getResourceURL(props.file.hash)
  )
  return {resourceURL, ...props}
}
