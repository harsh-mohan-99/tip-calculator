function Showtip({ t_amt_p, total_p, reset, resetDisabled }) {
    return (
        <>
            <div className="show">

                <p className="tip">
                    Tip Amount <br />
                    <span className="person">/ person</span>
                </p>

                <span className="amttext" ref={t_amt_p}>
                    $0.00
                </span>

                <p className="ttl">
                    Total <br />
                    <span className="person">/ person</span>
                </p>

                <span className="totl-text" ref={total_p}>
                    $0.00
                </span>

                <button
                    className="reset"
                    disabled={resetDisabled}
                    onClick={reset}
                    style={{
                        color: resetDisabled
                            ? 'hsl(183, 100%, 15%)'
                            : 'hsl(183, 100%, 15%)',

                        backgroundColor: resetDisabled
                            ? 'hsl(186, 14%, 43%)'
                            : 'hsl(172, 67%, 45%)'
                    }}
                >
                    RESET
                </button>

            </div>
        </>
    );
}

export default Showtip;