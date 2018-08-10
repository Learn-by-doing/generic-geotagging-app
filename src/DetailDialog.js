import React from 'react'

const DialogDetail = ({ location, onSave, name, id}) => (
    <div className="DialogDetail">
     
      <h2>Edit place</h2>
      <div>
        Point number:
      <input type='text' defaultValue={name} name='point_number' />
      </div>
      <div>
        Point name:
      <input type='text' defaultValue={id} name='point_name' />
      </div>
      <div>
        Location:
      <br />
        latitude: {location.position[0]}
        <br />
        longitude: {location.position[1]}
  
      </div>
      <div>
        Description: <br />
       <textarea></textarea>
  
      </div>
  
      <br />
      <button onClick={onSave}>Save Details</button>
      <br />
     
    </div>
  )


  export default DialogDetail;