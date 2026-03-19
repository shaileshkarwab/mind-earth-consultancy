using ClosedXML.Excel;
using MindEarth.Web.Features.Reports.DTO;

namespace MindEarth.Web.Features.Reports.ReportService
{
    public class ReportExcelService : IReportExcelService
    {
        public List<DTO_Excel> GetReportSections(string fileName)
        {

            var filePath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "uploaddata",
            "reports",
            fileName
            );
            List<DTO_Excel> rowData = new List<DTO_Excel>();
            using var workbook = new XLWorkbook(filePath);
            foreach (var ws in workbook.Worksheets)
            {
                foreach (var row in ws.RowsUsed().Skip(1))
                {
                    Int32 parentID = row.Cell(2).TryGetValue<int>(out Int32 ParentId) ? ParentId : 0;
                    if (parentID == 0)
                    {
                        var dto = CreateDto(row, ws.Name);
                        rowData.Add(dto);
                    }
                    else
                    {
                        //get the parent object and add to sub nodes;
                        var _parentRowId = row.Cell(2).TryGetValue<int>(out Int32 parentRowId) ? parentRowId : 0;
                        var parentDto = FindByRowId(rowData.Where(c => c.WorkSheetName == ws.Name).ToList(), _parentRowId);
                        if (parentDto != null)
                        {
                            var subDto = CreateDto(row, ws.Name);
                            parentDto.SubNodes.Add(subDto);
                        }
                    }

                }
            }
            //var reportImages = GetReportImage(rowData);
            //return reportImages;

            return rowData;
        }

        DTO_Excel CreateDto(IXLRow row, string worksheetName)
        {
            row.Cell(1).TryGetValue<int>(out int rowId);
            row.Cell(2).TryGetValue<int>(out int parentId);
            row.Cell(6).TryGetValue<int>(out int order);

            return new DTO_Excel
            {
                RowId = rowId,
                ParentId = parentId,
                Title = row.Cell(3).GetString(),
                Type = row.Cell(4).GetString(),
                Content = row.Cell(5).GetString(),
                Order = order,
                ImageName = row.Cell(7).GetString(),
                Figure = row.Cell(8).GetString(),
                ImageTitle = row.Cell(9).GetString(),
                WorkSheetName = worksheetName,
                SubNodes = new List<DTO_Excel>()
            };
        }

        DTO_Excel FindByRowId(List<DTO_Excel> nodes, int rowId)
        {
            foreach (var node in nodes)
            {
                if (node.RowId == rowId)
                    return node;

                var found = FindByRowId(node.SubNodes, rowId);

                if (found != null)
                    return found;
            }

            return null;
        }

       public List<DTO_ReportImage> GetReportImage(List<DTO_Excel> excelData)
        {
            List<DTO_ReportImage> reportImages = new List<DTO_ReportImage>();
            foreach (var item in excelData)
            {
                if (!string.IsNullOrEmpty(item.ImageName) && !string.IsNullOrEmpty(item.Figure) && !string.IsNullOrEmpty(item.ImageTitle))
                {
                    var reportImage = new DTO_ReportImage
                    {
                        ImageName = item.ImageName,
                        Figure = item.Figure,
                        ImageTitle = item.ImageTitle,
                        SavedImageName = "default-user.png"
                    };
                    // add to list
                    reportImages.Add(reportImage);
                }
                if (item.SubNodes != null && item.SubNodes.Count > 0)
                {
                    reportImages.AddRange(GetReportImage(item.SubNodes));
                }
            }

            return reportImages;
        }

       public List<DTO_Excel> FlatObject(List<DTO_Excel> _rowData)
        {
            var result = new List<DTO_Excel>();

            foreach (var node in _rowData)
            {
                result.Add(node);

                if (node.SubNodes != null && node.SubNodes.Any())
                {
                    result.AddRange(FlatObject(node.SubNodes));
                }
            }

            return result;
        }
    }
}
