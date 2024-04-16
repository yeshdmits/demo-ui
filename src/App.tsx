import React from 'react';
import './App.css';
import ProcessForm from './components/ProcessForm';
import { HashRouter, Routes, Route } from 'react-router-dom';
import DisplayJsonFormDialog from './components/form/DisplayJsonFormDialog';
import HelloComponent from './components/hello/HelloComponent';
import ProcessOverview from './flow/ProcessOverview';
import TaskCompleteJson from './flow/TaskCompleteJson';
import TaskCompleteCustom from './flow/TaskCompleteCustom';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import ProcessList from './flow/ProcessList';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/builder" element={<ProcessForm />} />
        <Route path="/builder/form" element={<DisplayJsonFormDialog />} />
        <Route path="/" element={<HelloComponent />} />
        <Route path="/process" element={<ProcessOverview />} />
        <Route path="/process/list" element={<ProcessList />} />
        <Route path="/process/task/json" element={<TaskCompleteJson />} />
        <Route path="/process/task/custom" element={<TaskCompleteCustom />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
