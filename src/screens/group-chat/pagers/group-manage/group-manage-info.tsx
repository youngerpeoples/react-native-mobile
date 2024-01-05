import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from '@/components/navbar';
import {styled} from 'nativewind';

import {View, TouchableOpacity, Text} from 'react-native';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
// 定义 prop 的类型
interface RuleItemProps {
  content: string;
}

// 使用 RuleItemProps
const RuleItem: React.FC<RuleItemProps> = ({content}) => (
  <StyledView className="my-5">
    <StyledText className="px-4">{content}</StyledText>
  </StyledView>
);
const rules = [
  '! 🎉🎉🎉',
  'a. 修改群聊名称',
  'b. 发表群公告',
  'c. 设置退群方式，并可确认退群申请',
  'd. 移除成员',
];

export default function GroupManager() {
  const navigation = useNavigation();

  return (
    <StyledView className="p-6 flex justify-center items-center">
      <Navbar
        title="管理员"
        renderLeft={() => {
          return (
            <StyledTouchableOpacity
              className="p-2"
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={32} color="black" />
            </StyledTouchableOpacity>
          );
        }}
      />

      <StyledView className="bg-white mt-5 rounded-md p-4">
        <StyledText className="text-base text-gray-700">
          群管理员可以用以下权利:
        </StyledText>
      </StyledView>

      {rules.map((rule, index) => (
        <RuleItem key={index} content={rule} />
      ))}

      <StyledView className="mt-10 flex-row justify-between">
        <StyledTouchableOpacity className="items-center">
          <Icon name="add-circle-outline" size={32} color="black" />
          <StyledText className="text-base text-black mt-5 text-center">
            邀请好友
          </StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity className="items-center">
          <Icon name="remove-circle-outline" size={32} color="black" />
          <StyledText className="text-base text-black mt-5 text-center">
            踢出成员
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}
