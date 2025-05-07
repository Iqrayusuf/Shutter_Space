import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ endDate, onTimerEnd }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(endDate) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft();
            setTimeLeft(updatedTimeLeft);

            if (Object.keys(updatedTimeLeft).length === 0) {
                clearInterval(timer);
                if (onTimerEnd) onTimerEnd();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return (
        <div>
            {Object.keys(timeLeft).length > 0 ? (
                <span>
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
            ) : (
                <span>Expired</span>
            )}
        </div>
    );
};

export default CountdownTimer;
