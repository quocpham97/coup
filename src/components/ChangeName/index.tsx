import { inject, Observer } from 'mobx-react';
import React, { useState } from 'react';
import { UserStore } from 'stores';

type Props = {
  userStore?: UserStore;
};

function ChangeName({ userStore }: Props) {
  const [name, setName] = useState('');

  const changeName = () => {
    if (userStore) {
      userStore.changeName(name);
    }
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Observer>
      {() => (
        <>
          <p>Current name is {userStore?.fullname}</p>
          <p>Info: {userStore?.info}</p>
          <input placeholder="enter name" type="text" value={name} onChange={onChangeText} />
          <button onClick={changeName} type="button">
            Change Name
          </button>
        </>
      )}
    </Observer>
  );
}

ChangeName.defaultProps = {
  userStore: undefined,
};

export default inject('userStore')(ChangeName);
