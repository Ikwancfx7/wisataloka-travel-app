function LoadingAnimation() {
    return (
            <div>
                <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        fill="none"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                    >
                    </circle>
                    <circle 
                        className="opacity-80" 
                        fill="none" cx="12" cy="12" r="10" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        strokeDasharray="60"
                        strokeDashoffset="30"
                    >    
                    </circle>
                </svg>
            </div>
        
    );
}

export default LoadingAnimation;