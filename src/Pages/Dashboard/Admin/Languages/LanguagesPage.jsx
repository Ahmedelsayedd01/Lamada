import React, { useEffect, useRef, useState } from 'react';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import { StaticLoader, Switch } from '../../../../Components/Components';
import { DeleteIcon } from '../../../../Assets/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Warning from '../../../../Assets/Icons/AnotherIcons/WarningIcon';
import { useChangeState } from '../../../../Hooks/useChangeState';

const LanguagesPage = ({ refetch, setUpdate }) => {
  const { refetch: refetchLanguages, loading: loadingLanguages, data: dataLanguages } = useGet({ url: 'https://lamadabcknd.food2go.online/admin/translation' });
  const { changeState, loadingChange, responseChange } = useChangeState();
  const { deleteData, loadingDelete, responseDelete } = useDelete();

  const [languages, setLanguages] = useState([]);
  const [openDelete, setOpenDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const languagesPerPage = 20; // Limit to 20 languages per page

  // Calculate total number of pages
  const totalPages = Math.ceil(languages.length / languagesPerPage);

  // Get the languages for the current page
  const currentLanguages = languages.slice(
    (currentPage - 1) * languagesPerPage,
    currentPage * languagesPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  // Fetch Languages when the component mounts or when refetch is called
  useEffect(() => {
    refetchLanguages();
  }, [refetchLanguages, refetch]); // Empty dependency array to only call refetch once on mount


  const handleOpenDelete = (item) => {
    setOpenDelete(item);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  const handleChangeActive = async (id, name, status) => {
    const response = await changeState(
      `https://lamadabcknd.food2go.online/admin/translation/status/${id}`,
      `${name} Changed Status.`,
      { status } // Pass status as an object if changeState expects an object
    );

    if (response) {
      // Update categories only if changeState succeeded
      setLanguages((prevLanguages) =>
        prevLanguages.map((language) =>
          language.id === id ? { ...language, status: status } : language
        )
      );
      setUpdate(!refetch)
    }
  };

  // Delete Language
  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://lamadabcknd.food2go.online/admin/translation/delete/${id}`, `${name} Deleted Success.`);

    if (success) {
      // Update Languages only if changeState succeeded
      setLanguages(
        languages.filter((language) =>
          language.id !== id
        )
      );
      setUpdate(!refetch)
    }
    console.log('Languages', languages)
  };

  // Update Languages when `data` changes
  useEffect(() => {
    if (dataLanguages && dataLanguages.translation_list) {
      setLanguages(dataLanguages.translation_list);
    }
  }, [dataLanguages]); // Only run this effect when `data` changes


  const headers = ['SL', 'Name', 'Status', 'Action'];

  return (
    <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingLanguages || loadingChange || loadingDelete ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className='w-full flex flex-col'>
          <table className="w-full sm:min-w-0">
            <thead className="w-full">
              <tr className="w-full border-b-2">
                {headers.map((name, index) => (
                  <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="w-full">
              {languages.length === 0 ? (
                <tr>
                  <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find languages</td>
                </tr>
              ) : (
                currentLanguages.map((language, index) => (
                  <tr className="w-full border-b-2" key={index}>
                    <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {(currentPage - 1) * languagesPerPage + index + 1}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {language?.name || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      <Switch
                        checked={language.status === 1}
                        handleClick={() => {
                          handleChangeActive(language.id, language.name, language.status === 1 ? 0 : 1);
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(language.id)}
                        >
                          <DeleteIcon />
                        </button>
                        {openDelete === language.id && (
                          <Dialog
                            open={true}
                            onClose={handleCloseDelete}
                            className="relative z-10"
                          >
                            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                  <div className="flex  flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <Warning
                                      width="28"
                                      height="28"
                                      aria-hidden="true"
                                    />
                                    <div className="flex items-center">
                                      <div className="mt-2 text-center">
                                        You will delete {language.name}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(language.id, language.name)}>
                                      Delete
                                    </button>

                                    <button
                                      type="button"
                                      data-autofocus
                                      onClick={handleCloseDelete}
                                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </DialogPanel>
                              </div>
                            </div>
                          </Dialog>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {languages.length > 0 && (
            <div className="my-6 flex items-center justify-center gap-x-4">
              {currentPage !== 1 && (
                <button type='button' className='text-lg px-4 py-2 rounded-xl bg-mainColor text-white font-medium' onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 mx-1 text-lg font-semibold rounded-full duration-300 ${currentPage === page ? 'bg-mainColor text-white' : ' text-mainColor'}`}
                >
                  {page}
                </button>
              ))}
              {totalPages !== currentPage && (
                <button type='button' className='text-lg px-4 py-2 rounded-xl bg-mainColor text-white font-medium' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LanguagesPage;