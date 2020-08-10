import React from 'react';

function Classes(props){
    var [students, setStudents] = React.useState([]);
    fetch('/students')
    .then((response)=>response.json())
    .then((json)=>setStudents({students: json}))
    return(
        <div>
            <p>{students[0]}</p>
            <p>아</p>
            <p>씨</p>
            <p>르</p>
            <p>방</p>
        </div>
    );
}

export default Classes;