import React from 'react';

const RenderLoginBox = (props) => {
  const { isLoggingIn } = props;
  
  return (
    <div>      
      {isLoggingIn ? null 
      : 
      <form>
        <div className="field">
          <label className="label">Name</label>
          <p className="control">
            <input className="input" type="text" placeholder="Text input" />
          </p>
        </div>
      </form>}      
    </div>
  );
};

export default RenderLoginBox;