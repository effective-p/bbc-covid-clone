(()=>{

    const actions ={
        birdFlies(toggle){
            if(toggle)
                document.querySelector('[data-index="2"] .bird')
                .style.transform=`translateX(${window.innerWidth}px)`;
            else
                document.querySelector('[data-index="2"] .bird')
                .style.transform=`translateX(-100%)`;

        },

        birdFlies2(toggle){
            if(toggle)
                document.querySelector('[data-index="5"] .bird')
                .style.transform=`translate(${window.innerWidth}px, -${window.innerHeight*0.7}px)`;
            else
                document.querySelector('[data-index="5"] .bird')
                .style.transform=`translateX(-100%)`;

        }
    };

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; // current visible image
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) =>{
        ioIndex = entries[0].target.dataset.index * 1;
        console.log(ioIndex);
    });

    for(let i = 0; i < stepElems.length; i++){
        io.observe(stepElems[i]);
        // el.setAttribute('data-index', i);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    };

    function activate (action)
    {
        currentItem.classList.add('visible');
        action && actions[action](true);

    }

    function deactivate(action) 
    {
        currentItem && currentItem.classList.remove('visible');
        action && actions[action](false);
       
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        
        // for(let i = 0; i < stepElems.length; i++){
        for(let i = ioIndex - 1; i < ioIndex + 2; i++){
            step = stepElems[i];
            if(!step) continue;

            boundingRect = step.getBoundingClientRect();
            if(boundingRect.top > window.innerHeight *0.1 &&
                boundingRect.top < window.innerHeight * 0.8)
                {
                    deactivate(currentItem.dataset.action);
                    currentItem = graphicElems[i];
                    activate(currentItem.dataset.action);
                }
        }
    });

    window.addEventListener('load', () =>{
        setTimeout(() => scroll(0,0), 100);
    }, false);

    activate();
})();
