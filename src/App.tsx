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
import LoginComponent from './components/login/Login';
import AuthLayout from './components/login/AuthLayout';
import ErrorBoundary from './components/login/ErrorComponent';
import ErrorComponent from './components/login/ErrorComponent';

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

        <Route element={<AuthLayout url="/process" />}>
          <Route path="/process" element={<ProcessOverview />} />
        </Route>
        <Route element={<AuthLayout url="/process/task/json" />}>
          <Route path="/process/task/json" element={<TaskCompleteJson />} />
        </Route>

        <Route element={<AuthLayout url="/process/task/custom" />}>
          <Route path="/process/task/custom" element={<TaskCompleteCustom />} />
        </Route>

        <Route element={<AuthLayout url="/process/list" />}>
          <Route path="/process/list" element={<ProcessList />} />
        </Route>

        <Route path="/login" element={<LoginComponent />} />
        <Route path="/error" element={<ErrorComponent />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
