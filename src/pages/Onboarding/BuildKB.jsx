import React, { useState } from 'react';
import { Chip, Button, Divider, Image, Input, Link, useNavbar, Card, CardHeader, CardFooter, Progress, Textarea, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import FileUploadButton from './FileUploadBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const BuildKB = () => {
  const [step, setStep] = useState(1);
  const [collectionName, setCollectionName] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspace, setWorkspace] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const navigate = useNavigate()
  console.log(step);

  const handleNextStep = () => {
    setStep(step + 1);
    console.log(step);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    console.log(step);
  };

  const renderTags = () => {
    return tags.map((tag, index) => (
      <Chip
        key={index}
        className="mr-2 mb-2"
        size='md'
        color={[
          'secondary',
          'success',
          'warning',
          'danger',
          'primary',

        ][index % 6]}
        variant="flat"
        onClose={() => handleTagRemove(tag)}
      >
        {tag}
      </Chip>
    ));
  };

  const FinishOnboarding = () => {
    navigate('/')
  }

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "workspaceName") {
      setWorkspaceName(value);
      setWorkspace(value ? `${value.replace(/\s+/g, '-').toLowerCase()}.haya.ai` : '');
    } else if (field === "collectionName") {
      setCollectionName(value);
    }
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const renderStep = (step) => {
    if (step === 1) {
      return (
        <div>
          <Progress color="danger" aria-label="Loading..." size='sm' className='pt-8' value={0} />
          <div className='mb-1.5 mt-8 sm:text-left text-2xl tracking-[-0.16px] text-slate-12 font-bold '>
            Create a workspace
          </div>
          <div>
            Create a workspace for your knowledge base
          </div>
          <Input
            radius="sm"
            className='border-slate-6 pt-8'
            key={"workspaceName"}
            label="Name"
            variant={"faded"}
            value={workspaceName}
            labelPlacement={"outside"}
            placeholder="Name your workspace"
            onChange={(e) => handleInputChange(e, "workspaceName")}
          />
          <Input
            radius="sm"
            className='border-slate-6 pt-8'
            key={"workspaceDomain"}
            type="text"
            label="Workspace Domain"
            variant={"faded"}
            isDisabled
            labelPlacement={"outside"}
            value={workspace}
            placeholder="Name your workspace"
          />
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <Progress color="warning" aria-label="Loading..." size='sm' className='pt-8' value={25} />
          <div className='mb-1.5 mt-8 sm:text-left text-2xl tracking-[-0.16px] text-slate-12 font-bold '>
            Create a collection folder
          </div>
          <div>
            Create a collection folder to store your documents in one place.
          </div>
          <Input
            radius="sm"
            className='border-slate-6 pt-8'
            key={"collectionName1"} // Unique key for the first input
            label="Name"
            variant={"faded"}
            labelPlacement={"outside"}
            placeholder="Name of your collection folder"
            value={collectionName}
            onChange={(e) => handleInputChange(e, "collectionName")}
          />
          <Textarea
            radius="sm"
            className='border-slate-6 pt-8'
            key={"collectionName2"} // Unique key for the second input
            label="Description"
            variant={"faded"}
            labelPlacement={"outside"}
            placeholder="Give a good description for your folder"


          />
          <Input
            radius="sm"
            className='border-slate-6 pt-8'
            key={"outside"}
            type="text"
            label="Tags"
            variant={"faded"}
            labelPlacement={"outside"}
            placeholder="Press Enter to add multiple tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagInputKeyPress}
          />

          <div className="flex flex-wrap pt-8">
            {renderTags()}
          </div>


        </div >
      );
    } else if (step === 3) {
      return (
        <div>
          <Progress color="secondary" aria-label="Loading..." size='sm' className='pt-8' value={50} />
          <div className='mb-1.5 mt-8 sm:text-left text-2xl tracking-[-0.16px] text-slate-12 font-bold'>
            Upload your documents
          </div>
          <div>
            Upload your documents to your collection.
          </div>
          <div className='items-end flex flex-col-reverse'>

            <FileUploadButton />
          </div>
          <div className='pt-8'>

            <Table removeWrapper aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Document Type</TableColumn>
                <TableColumn>Edit</TableColumn>

              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>Time GPT</TableCell>
                  <TableCell>PDF</TableCell>
                  <TableCell>...</TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell>Documentation TimeGPT</TableCell>
                  <TableCell>Word Document</TableCell>
                  <TableCell>...</TableCell>

                </TableRow>
                <TableRow key="5">
                  <TableCell>Nerfstudio.com</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>...</TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      );
    } else if (step === 4) {
      return (
        <div>
          <Progress color="success" aria-label="Loading..." size='sm' className='pt-8' value={75} />
          <div className='mb-1.5 mt-8 sm:text-left text-2xl tracking-[-0.16px] text-slate-12 font-bold'>
            Collaborate
          </div>
          <div>
            Invite users to your space for a collaborative knowledge base. You can press the "Enter" key to accept multiple emails.
          </div>
          <Input
            radius="sm"
            className='border-slate-6 pt-8'
            key={"collectionName1"} // Unique key for the first input
            label="Invite users"
            variant={"faded"}
            labelPlacement={"outside"}
            placeholder="name@example.com"
          />


        </div>
      );
    }

    else {
      return (
        <>
          done
        </>
      );
    }
  };

  const renderButtons = () => {
    if (step === 1) {
      return (
        <>
          <Button color="danger" onClick={handleNextStep}>Next</Button>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <Button onClick={handlePrevStep}>Back</Button>
          <Button onClick={handleNextStep} color='warning'>Next</Button>
        </>
      );
    } else if (step === 3) {
      return (
        <>
          <Button onClick={handlePrevStep}>Back</Button>
          <Button onClick={handleNextStep} color='secondary'>Next</Button>
        </>
      );
    }
    else if (step === 4) {
      return (
        <>
          <Button onClick={handlePrevStep}>Back</Button>
          <Button onClick={FinishOnboarding} color='success'>Next</Button>
        </>
      );
    }

    else {
      return null;
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <main className='mx-auto min-h-[590px] w-full max-w-[450px]'>
        <div className='flex items-center gap-4'>
          <Image
            width={50}
            alt="NextUI hero Image"
            src="Assets/haya-logo.png"
          />
          <h1 className='sm:text-left text-large tracking-[-0.16px] text-slate-12 font-semibold '>
            Haya Knowledge
          </h1>
        </div>
        {renderStep(step)}
        <div className='flex justify-between pt-8'>
          {renderButtons()}
        </div>
      </main>
    </div>
  );
};

export default BuildKB;
