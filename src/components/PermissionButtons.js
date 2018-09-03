import React from "react";

const PermissionButtons = ({ permissions, togglePermission }) => {
  const buttons = permissions.map((permission, i) => {
    return (
      <button key={i} onClick={() => togglePermission(permission, i)}>
        {permission.name}
      </button>
    );
  });

  return buttons;
};

export default PermissionButtons;
