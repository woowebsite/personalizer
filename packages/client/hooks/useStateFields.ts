import { cloneDeep, PropertyPath, set } from 'lodash';
import { useState } from 'react';

/**
 * Using change an complex object state. 
 * Eg
 *      const [const [data, setJob] = useStateFields(dataJob);
 *      setJob(['job', 'title'], title);
 *      setJob(['job.title'], title);
 * @param initialValues default value it like useState(initialValues)
 * @returns [data, setField]
 */
const useStateFields = (initialValues: any) => {
  const [data, setData] = useState(initialValues);

  const setField = (path: PropertyPath, value) => {
    const newData = cloneDeep(set(data, path, value));
    setData(newData);
  };
  return [data, setField];
};

export default useStateFields;
