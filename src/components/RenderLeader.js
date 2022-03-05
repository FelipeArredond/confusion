import React from 'react';
import { Media } from 'reactstrap';

function Leader({leaders}){
    const leadersVariable = leaders.map((leader) => {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={leader.image} alt={leader.name} />
                </Media>
                <Media body className="ml-5">
                    <Media heading>{leader.name}</Media>
                    <p>{leader.designation}</p>
                    <p>{leader.description}</p>
                </Media>
            </Media>
        );
    });
    return({leadersVariable});
}

export default Leader;