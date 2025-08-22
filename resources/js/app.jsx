import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router} from 'react-router-dom';

const appName = import.meta.env.VITE_APP_NAME || 'Di Dwa';

createInertiaApp({
    title: (title) => appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
        // root.render(
        //     <Router>
        //         <App {...props} />
        //     </Router>
        // )
    },
    progress: {
        color: '#C10007',
    },
});

// This will set light / dark mode on load...
// initializeTheme();
