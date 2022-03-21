import React from 'react';
import { Media } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';


function RenderLeader(props){
    const leaders = props.leaders.leaders.map((leader) => {
        return (
            <FadeTransform in 
                transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + leader.image} alt={leader.name} />
                </Media>
                <Media body className="ml-5">
                    <Media heading>{leader.name}</Media>
                    <p>{leader.designation}</p>
                    <p>{leader.description}</p>
                </Media>
            </Media>
            </FadeTransform>
        );
    });
    return(leaders);
}

export default RenderLeader;