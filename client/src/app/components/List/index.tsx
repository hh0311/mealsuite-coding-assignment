import React from 'react';
import styles from './style.module.css';

type ListProps<T extends { id: number | string }> = {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
};

function List<T extends { id: number | string }>({
  renderItem,
  data,
}: ListProps<T>) {
  return (
    <ul className={styles['list']}>
      {data.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export default List;
