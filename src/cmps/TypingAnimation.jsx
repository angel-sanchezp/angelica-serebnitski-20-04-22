import TypeAnimation from 'react-type-animation';

export function TypingAnimation (){
    return (
        <TypeAnimation
            style={{ position:'absoluite'}}
            cursor={false}
            sequence={[
                'Weather For Today in  ',
                3000,
                '5 Daily Forecast in ',
                3000,
           
            ]}
            wrapper="p"
            repeat={Infinity}
        />
    );
};

