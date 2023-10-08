import classes from './Lines.module.css';

interface LinesProps {
    index: number;
    total: number;
    location : "front" | "back";
}

function Lines({ index, total, location}: LinesProps) {
    const rightLineTop = total > 1 && index === 0 || index !== 0 && index + 1 !== total
    const leftLineTop = total > 1 && index + 1 === total || index !== 0 && index + 1 !== total
    return (
    <div className={`${classes.lines} ${classes[location]}`}>
        <span className={leftLineTop ? classes.lineTop : undefined}></span>
        <span className={rightLineTop ? `${classes.lineTop} ${classes.right}` : classes.right}></span>
    </div>
    )
}

export default Lines;