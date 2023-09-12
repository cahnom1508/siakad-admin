import { Link } from "react-router-dom";
import Loader from "./Loader";
import { currencyFormatter } from "../utilities/formatter";
import {
   AiOutlineLink,
   AiOutlineCloudDownload,
   AiFillDelete,
} from "react-icons/ai";
import Button from "./Button";
import { useDownloadFile } from "../helpers/useDownloadFile";

/**
 *
 * @param {headers} param header type data of array string values
 *  @param {datas} param data array for table contents
 * @returns head table and body toble
 */

export const TableLinkComponent = ({
   datas,
   isLoading,
   headers,
   keyBody,
   pathUrl,
   handleDelete,
   pathId,
}) => {
   return (
      <div className="w-full">
         {isLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : datas !== null ? (
            <table className="table-auto w-full">
               <thead className={`border-b mb-3 capitalize font-semibold mt-3`}>
                  {/* header table */}
                  <tr>
                     {headers.map((h, i) => (
                        <th key={i} className="pl-1 text-left py-2">
                           {h}
                        </th>
                     ))}
                     {pathUrl && (
                        <th className="pl-1 text-left py-2">detail</th>
                     )}
                     {handleDelete && (
                        <th className="pl-1 text-left py-2">action</th>
                     )}
                  </tr>
               </thead>
               {/* table contents */}
               <tbody className={``}>
                  {datas?.map((data, idx) => (
                     <tr
                        key={idx}
                        className={`hover:bg-emerald-100 ${
                           idx % 2 == 0 && "bg-emerald-50 hover:bg-emerald-100"
                        }`}>
                        {keyBody.map((k, i) => (
                           <td key={i} className="pl-1 py-2">
                              {data[keyBody[i]] === "jumlah"
                                 ? "Rp." + currencyFormatter(data[keyBody[idx]])
                                 : data[keyBody[i]]}
                           </td>
                        ))}
                        {pathUrl && (
                           <td className="pl-1 py-2">
                              <Link
                                 className="bg-emerald-100 text-emerald-600"
                                 to={
                                    pathUrl
                                       ? `${pathUrl}/${
                                            pathId ? data[pathId] : data.id
                                         }`
                                       : data.id
                                 }>
                                 <AiOutlineLink size={20} />
                              </Link>
                           </td>
                        )}
                        {handleDelete && (
                           <td className="pl-1 py-2">
                              <Button
                                 error
                                 onClick={() => handleDelete(data.id)}>
                                 <AiFillDelete size={20} />
                              </Button>
                           </td>
                        )}
                     </tr>
                  ))}
               </tbody>
            </table>
         ) : (
            <p>fetch Data Error</p>
         )}
      </div>
   );
};

export const TableFileDownloadComponent = ({
   datas,
   isLoading,
   headers,
   keyBody,
   fileDownloadName,
   handleDelete,
}) => {
   const { downloadFile, downloadIsLoading } = useDownloadFile();
   const handleDownloadFile = async (fileName) => {
      await downloadFile(fileName, fileDownloadName);
   };

   return (
      <div className="w-full">
         {isLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : datas !== null ? (
            <table className="table-auto w-full">
               <thead className={`border-b mb-3 capitalize font-semibold mt-3`}>
                  {/* header table */}
                  <tr>
                     {headers.map((h, i) => (
                        <th key={i} className="pl-1 text-left py-2">
                           {h}
                        </th>
                     ))}
                     <th className="pl-1 text-left py-2">Download</th>
                     <th className="pl-1 text-left py-2">delete</th>
                  </tr>
               </thead>
               {/* table contents */}
               <tbody>
                  {datas?.map((data, idx) => (
                     <tr
                        key={idx}
                        className={`hover:bg-emerald-100 ${
                           idx % 2 == 0 && "bg-emerald-50 hover:bg-emerald-100"
                        }`}>
                        {keyBody.map((k, i) => (
                           <td key={i} className="pl-1 py-2">
                              {data[keyBody[i]] === "jumlah"
                                 ? "Rp." + currencyFormatter(data[keyBody[idx]])
                                 : data[keyBody[i]]}
                           </td>
                        ))}
                        <td className="pl-1 py-2">
                           <Button
                              update
                              isLoading={downloadIsLoading}
                              onClick={() => handleDownloadFile(data.file)}>
                              <AiOutlineCloudDownload size={20} /> Download
                           </Button>
                        </td>
                        <td className="pl-1 py-2">
                           <Button error onClick={() => handleDelete(data.id)}>
                              <AiFillDelete size={20} />
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         ) : (
            <p>fetch Data Error</p>
         )}
      </div>
   );
};
