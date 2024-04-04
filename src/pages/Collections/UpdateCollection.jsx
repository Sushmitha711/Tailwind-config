import React, { useEffect, useState } from 'react'
import ModalPopup from './ModalPopup';
import { Button, Chip, Input, ModalBody, ModalHeader, Switch, Textarea } from '@nextui-org/react';
import { UpdateData } from '../../controllers/strapiController';

const UpdateCollection = ({ isWarningOpen, onWarningOpenChange, SelectCollection, setLoader }) => {
    const [tagInput, setTagInput] = useState('');
    const [validationCondition, setValidationCondition] = useState(false);
    // const [isPublic, setIsPublic] = useState(false);
    const [InitialData, setInitialData] = useState(null);
    const CollectionName = "collections"
    const UserDetails = JSON.parse(sessionStorage.getItem("userData"));
    const UserID = UserDetails && UserDetails.user && UserDetails.user.id;
    const [tags, setTags] = useState([]);
    const [formData, setFormdata] = useState({
        Name: '',
        Description: '',
        Tags: [],
        isPublic:false
    });
    const [formError, setFormError] = useState({
        NameError: '',
        DescriptionError: '',
    });

    const renderTags = () => {
        return tags && tags.map((tag, index) => (
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


    const handleTagRemove = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
        setFormdata(() => ({ ...formData, Tags: tags.filter(tag => tag !== tagToRemove) }))
    };

    const handleTagInputKeyPress = (e) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            setTags([...tags, tagInput.trim()]);
            setFormdata(() => ({ ...formData, Tags: [...tags, tagInput.trim()] }))
            setTagInput('');
        }
    };

    useEffect(() => {
        setLoader(true);
        if (SelectCollection) {
            const TagsData = SelectCollection.attributes.Tags && SelectCollection.attributes.Tags.tags;
            setInitialData(TagsData);
            TagsData && setTags(SelectCollection.attributes.Tags.tags)
            setFormdata({
                Name: SelectCollection.attributes.Name,
                Description: SelectCollection.attributes.Description,
                Tags: TagsData,
                isPublic:SelectCollection.attributes.Public
            })
            setLoader(false);
        }

    }, [SelectCollection])


    const Validation = () => {
        let IsValid = true;

        if (!formData.Name) {
            IsValid = false;
            setFormError((previous) => ({ ...previous, NameError: "Name is required." }));
        } else {
            setFormError((previous) => ({ ...previous, NameError: null }))
        }

        if (!formData.Description) {
            IsValid = false;
            setFormError((previous) => ({ ...previous, DescriptionError: "Description is required." }))
        } else {
            setFormError((previous) => ({ ...previous, DescriptionError: null }))
        }

        return IsValid;
    }


    // Check if the arrays are of the same length
    const lengthMatch = formData.Tags && InitialData && InitialData.length === formData.Tags.length;

    // Check if each element matches
    const elementsMatch = InitialData && InitialData.length > 0 && formData.Tags && formData.Tags.length > 0 ? InitialData.every((element, index) => element === formData.Tags[index]) : null;

    const TagsCompare = lengthMatch && elementsMatch;

    const Disabled = SelectCollection && SelectCollection.attributes &&
        formData.Name === SelectCollection.attributes.Name && formData.Description === SelectCollection.attributes.Description && (TagsCompare === true || TagsCompare === null)&&formData.isPublic=== SelectCollection.attributes.Public? true : false;
    // SelectCollection && SelectCollection.attributes &&console.log("hdara",formData.Name === SelectCollection.attributes.Name && formData.Description === SelectCollection.attributes.Description)

    const SubmitHandler = async (onClose) => {
        setLoader(true);
        const payload = {
            Name: formData.Name,
            Description: formData.Description,
            Tags: {
                tags: formData.Tags
            },
            Public:formData.isPublic
        }

       
        const Validate = Validation();
        if (Validate) {
            setValidationCondition(false);
            const response = await UpdateData(CollectionName, SelectCollection.id, payload)
            if (response) {
                onClose();
                setTimeout(() => {
                    setLoader(false);
                    window.location.reload();
                }, 500)

            }
        } else {
            setValidationCondition(true);
        }
    }


    const ModalBodyData = () => {
        return <> <ModalHeader className="flex flex-col gap-1">Create a new Collection</ModalHeader>
            <ModalBody className='gap-0'>
                <Input
                    isRequired
                    key="outside"
                    type="text"
                    value={formData.Name}
                    onChange={(e) => { setFormdata({ ...formData, Name: e.target.value }) }}
                    isInvalid={!formData.Name && validationCondition ? !formData.Name || validationCondition : ''}
                    errorMessage={!formData.Name && validationCondition ? formError.NameError : ""}
                    label="Collection Name"
                    labelPlacement="outside"
                    placeholder="Enter your collection folder name"
                />
                <Textarea
                    className='pt-4'
                    key={"outside"}
                    isRequired
                    type="text"
                    value={formData.Description}
                    onChange={(e) => { setFormdata({ ...formData, Description: e.target.value }) }}
                    isInvalid={!formData.Description && validationCondition ? !formData.Description || validationCondition : ''}
                    errorMessage={!formData.Description && validationCondition ? formError.DescriptionError : ""}
                    label="Decription"
                    labelPlacement={"outside"}
                    placeholder="Enter your collection's Description"
                />
                <div className='flex flex-col gap-1 pt-4'>
                <div className='flex gap-2 flex-col'>
                    <p className='text-sm'>Make collection public</p>
                    <Switch isSelected={formData.isPublic} onChange={(e) => { setFormdata({ ...formData, isPublic:!formData.isPublic}) }} size='sm' color="secondary"></Switch>
                </div>
                {formData.isPublic?<p className='text-xs text-slate-400'>By making your collection public anyone inside the space can view and upload your documents.</p>:<></>}
                </div>
                <Input
                    radius="sm"
                    className='border-slate-6 pt-4'
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

            </ModalBody>
        </>
    }


    const footerCreate = (onClose) => {
        return <><Button color="default" variant="flat" onClick={() => { onClose() }}>
            Cancel
        </Button>
            <Button isDisabled={Disabled} color="secondary" onClick={() => { SubmitHandler(onClose) }}>
                Update
            </Button></>
    }


    return (
        <div>
            <ModalPopup
            size="lg"
                isOpen={isWarningOpen}
                onOpenChange={onWarningOpenChange}
                ModalBodyData={ModalBodyData}
                footer={footerCreate}
                scrollBehavior="inside"
            />
        </div>
    )
}

export default UpdateCollection;