import TypeAnimation from 'react-type-animation';

export function TypingAnimation (){
    return (
        <TypeAnimation
            style={{ position:'absoluite'}}
            cursor={false}
            sequence={[
                'Weather For Today in  ',
                2000,
                '5 Daily Forecast in ',
                2000,
           
            ]}
            wrapper="p"
            repeat={Infinity}
        />
    );
};

