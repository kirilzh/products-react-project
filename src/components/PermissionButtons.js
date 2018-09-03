import React from "react";

const PermissionButtons = ({ permissions, togglePermission }) => {
  return permissions.map((permission, i) => {
    return (
      <button key={i} onClick={() => togglePermission(permission, i)}>
        {permission.name}
      </button>
    );
  });
};

export default PermissionButtons;
