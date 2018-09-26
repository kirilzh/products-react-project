import React from "react";

const PermissionButtons = ({ permissions, togglePermission }) => {
  return permissions.map((permission, i) => {
    return (
      <button key={i} onClick={() => togglePermission(permission, i)}>
        {permission.name}
        <span></span>
      </button>
    );
  });
};

export default PermissionButtons;
